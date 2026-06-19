import Link from "next/link";
import { MenuLink } from "./menu-link";

interface MegaColumnProps {
  title: string;
  href: string;
  links: {
    label: string;
    href: string;
    id: string;
  }[];
}

export function MegaColumn({ title, href, links }: MegaColumnProps) {
  return (
    <div>
      {href && href !== "#" ? (
        <Link
          href={href}
          className="mb-3 block text-sm font-semibold hover:text-primary transition-colors"
        >
          {title}
        </Link>
      ) : (
        <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      )}

      <div className="space-y-2">
        {links.map((link) => (
          <MenuLink key={link.id} {...link} />
        ))}
      </div>
    </div>
  );
}
