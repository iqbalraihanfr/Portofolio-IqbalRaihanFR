import { IoLogoVercel } from "react-icons/io5";
import {
  SiGit,
  SiSass,
  SiReact,
  SiNotion,
  SiMongodb,
  SiFirebase,
  SiMarkdown,
  SiPrettier,
  SiNodedotjs,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiGoogleanalytics,
  SiPython,
  SiFastapi,
  SiTensorflow,
  SiPandas,
  SiNumpy,
  SiPhp,
  SiMysql,
  SiNetlify,
} from "react-icons/si";
import { TbSeo } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa";
import { Tooltip } from "@/components/ui/tooltip";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

type TechList = Record<string, { name: string; Icon: IconType }>;

const techList: TechList = {
  nextjs: { name: "Next.js", Icon: SiNextdotjs },
  python: { name: "Python", Icon: SiPython },
  fastapi: { name: "FastAPI", Icon: SiFastapi },
  tensorflow: { name: "TensorFlow", Icon: SiTensorflow },
  pandas: { name: "Pandas", Icon: SiPandas },
  numpy: { name: "NumPy", Icon: SiNumpy },
  php: { name: "PHP", Icon: SiPhp },
  mysql: { name: "MySQL", Icon: SiMysql },
  tailwindcss: { name: "Tailwind CSS", Icon: SiTailwindcss },
  seo: { name: "SEO", Icon: TbSeo },
  netlify: { name: "Netlify", Icon: SiNetlify },
  headlesscms: { name: "Headless CMS", Icon: FaDatabase },
  react: { name: "React", Icon: SiReact },
  scss: { name: "SCSS", Icon: SiSass },
  javascript: { name: "JavaScript", Icon: SiJavascript },
  typescript: { name: "TypeScript", Icon: SiTypescript },
  nodejs: { name: "Node.js", Icon: SiNodedotjs },
  firebase: { name: "Firebase", Icon: SiFirebase },
  mongodb: { name: "MongoDB", Icon: SiMongodb },
  swr: { name: "SWR", Icon: IoLogoVercel },
  mdx: { name: "MDX", Icon: SiMarkdown },
  prettier: { name: "Prettier", Icon: SiPrettier },
  analytics: { name: "Google Analytics", Icon: SiGoogleanalytics },
  git: { name: "Git", Icon: SiGit },
  notion: { name: "Notion API", Icon: SiNotion },
};

export function TechIcon({ tech, withLabel = false, className }: { tech: string; withLabel?: boolean; className?: string }): React.JSX.Element | null {
  const techKey = tech.toLowerCase().replace(/\s/g, "").replace(/\./g, "");
  const techInfo = techList[techKey];

  if (!techInfo) {
    return <Badge variant="secondary">{tech}</Badge>;
  }

  const { name, Icon } = techInfo;

  const iconElement = <Icon className={cn("w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors", className)} />;

  if (withLabel) {
    return (
      <div className="flex items-center gap-2 group cursor-pointer">
        {iconElement}
        <span className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
      </div>
    );
  }

  return (
    <Tooltip tip={name}>
      {iconElement}
    </Tooltip>
  );
}

