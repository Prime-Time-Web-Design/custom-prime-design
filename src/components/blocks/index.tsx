import { PageQuery } from "../../../tina/__generated__/types";
import HeroBlock from "./HeroBlock";

interface BlocksProps {
  hero?: PageQuery["page"]["hero"];
}

export const Blocks = (props: BlocksProps) => {
  return <>{props.hero && <HeroBlock data={{ hero: props.hero }} />}</>;
};
