import { post, author } from "@/content";
import styles from "./page.module.css";

export default async function Page() {
  const allPost = await post.getAll();
  const allAuthor = await author.getAll();

  return (
    <main className={styles.main}>
      <div>
        {allPost.map((postItem) => (
          <article key={postItem.href}>
            <h1>{postItem.frontmatter.title}</h1>
            <p>{postItem.frontmatter.date.toDateString()}</p>
          </article>
        ))}
      </div>
      <div>
        {allAuthor.map((authorItem) => (
          <p key={authorItem.id}>{authorItem.name}</p>
        ))}
      </div>
    </main>
  );
}
