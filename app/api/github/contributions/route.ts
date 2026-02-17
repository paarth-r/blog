import { NextResponse } from 'next/server'

const GITHUB_GRAPHQL = 'https://api.github.com/graphql'
const USERNAME = process.env.GITHUB_USERNAME ?? 'paarth-r'

export type ContributionDayItem = {
  date: string
  count: number
  weekday: number
}

export type ContributionsResponse = {
  totalContributions: number
  /** Weeks: each week has 0–7 days (weekday 0=Sun … 6=Sat) for grid columns */
  weeks: { contributionDays: ContributionDayItem[] }[]
  to: string
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token?.trim()) {
    return NextResponse.json(
      { error: 'GITHUB_TOKEN is required for the contributions API (GitHub GraphQL requires auth)' },
      { status: 503 }
    )
  }

  const to = new Date()
  const from = new Date(to)
  from.setFullYear(from.getFullYear() - 1)
  const fromStr = from.toISOString().slice(0, 10) + 'T00:00:00Z'
  const toStr = to.toISOString().slice(0, 10) + 'T23:59:59Z'

  const query = `
    query($user: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $user) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
                weekday
              }
            }
          }
        }
      }
    }
  `

  let res: Response
  try {
    res = await fetch(GITHUB_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { user: USERNAME, from: fromStr, to: toStr },
      }),
      next: { revalidate: 600 },
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'Network error calling GitHub' },
      { status: 502 }
    )
  }

  const json = await res.json().catch(() => ({}))

  if (!res.ok) {
    const message =
      res.status === 401
        ? 'Invalid or expired GITHUB_TOKEN'
        : res.status === 403
          ? 'GitHub rate limit or forbidden'
          : `GitHub returned ${res.status}`
    return NextResponse.json({ error: message }, { status: 502 })
  }

  if (json.errors?.length) {
    const msg = json.errors[0]?.message ?? 'GraphQL error'
    return NextResponse.json({ error: msg }, { status: 502 })
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar) {
    return NextResponse.json(
      { error: 'User or calendar not found' },
      { status: 404 }
    )
  }

  const weeks = (calendar.weeks ?? []).map(
    (week: { contributionDays: { date: string; contributionCount: number; weekday: number }[] }) => ({
      contributionDays: (week.contributionDays ?? []).map(
        (day: { date: string; contributionCount: number; weekday: number }) => ({
          date: day.date,
          count: day.contributionCount ?? 0,
          weekday: day.weekday ?? 0,
        })
      ),
    })
  )

  const response: ContributionsResponse = {
    totalContributions: calendar.totalContributions ?? 0,
    weeks,
    to: toStr.slice(0, 10),
  }

  return NextResponse.json(response)
}
