import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1>
      <p className="mb-4">
        {`I’m a student developer exploring computer vision, robotics, and AI — and their intersection. 
        I spend a lot of my time building trying to solve real-world problems through research and SOTA technologies
        — whether it’s improving how robots see the world, or using CV and AI to make fitness more accessible.
        I’m always experimenting, learning, and striving to turn ideas into things that actually work.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
