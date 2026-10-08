import type { ResolvedListenLink } from "@/lib/media";
import styles from "./ListenIcons.module.css";
import { ListenMark } from "./SocialMarks";

/** "Watch & listen on:" and a row of round platform icons, as on a blog post. */
export default function ListenIcons({
  label,
  links,
}: {
  label: string;
  links: ResolvedListenLink[];
}) {
  if (links.length === 0) return null;

  return (
    <div className={styles.row}>
      <p className={styles.label}>{label}</p>
      <ul className={styles.icons}>
        {links.map((link) => (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.name} (opens in a new tab)`}
              title={link.name}
              className={styles.icon}
            >
              <ListenMark platform={link.platform} className={styles.mark} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
