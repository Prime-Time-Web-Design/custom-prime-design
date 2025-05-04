"use client";
import HeroBlock from "@/components/blocks/HeroBlock";
import { PageQuery } from "../../../tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

export type HomeSchema = {
  data: {
    page: PageQuery["page"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
};

export default function HomeContent(props: HomeSchema) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      <HeroBlock data={data.page} />
    </>
  );
}
