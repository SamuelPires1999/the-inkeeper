import { Separator } from "./ui/separator";

interface Props {
  name: string;
  description: string;
  class: string;
  meta: boolean;
}

export default function DeckInfo(props: Props) {
  return (
    <div className="rounded-sm border border-secondary-foreground p-4 flex space-x-4">
      <div className="w-20 bg-black rounded-sm">a</div>
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl">{props.name}</h1>
        <span className="text-sm italic opacity-50">{props.description}</span>
        <div className="flex space-x-2">
          <span>{props.class}</span>
          {props.meta ? <span>META</span> : <span>NON META</span>}
        </div>
      </div>
    </div>
  );
}
