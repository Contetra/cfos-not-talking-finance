import { Swoosh } from "@/app/components/home/decor";
import shared from "@/app/components/home/home.module.css";
import { site } from "@/data/site";
import { cn } from "@/lib/cn";
import { resolveListenLinks } from "@/lib/media";
import styles from "./SiteFooter.module.css";
import { ListenMark } from "./SocialMarks";

/**
 * The redesign's footer, the same on every page: a navy band with "Listen to
 * us on" and the platforms. Platforms without a URL in data/site.ts are left
 * out until one is added. The year is computed at render, never hardcoded.
 */
export default function SiteFooter() {
  const links = resolveListenLinks();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <span aria-hidden="true" className={cn(shared.pattern, styles.pattern)} />
        <Swoosh
          id="swoosh-footer"
          className={styles.swoosh}
          viewBox="0 0 1440 240"
          paths={["M-30 40C60 10 150 60 170 130C190 205 120 250 60 214C10 184 40 110 120 104"]}
          from={[120, 104]}
          to={[-30, 40]}
          color="#f79d00"
          opacity={0.42}
        />

        <div className={styles.inner}>
          <span aria-hidden="true" className={styles.rule} />
          <div className={styles.row}>
            <h2 className={styles.title}>Listen to us on</h2>
            <ul className={styles.platforms}>
              {links.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.platform}
                  >
                    <ListenMark platform={link.platform} className={styles.mark} />
                    {link.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className={styles.legal}>
            © {year} {site.producer}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
