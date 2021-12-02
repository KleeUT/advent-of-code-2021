import { data } from "./input";

type Position = { horisontal: number; vertical: number };
type ActOnPosition = (num: number, current: Position) => Position;
const actions = new Map<string, ActOnPosition>([
  [
    "forward",
    (num: number, current: Position): Position => ({
      ...current,
      horisontal: current.horisontal + num,
    }),
  ],
  [
    "up",
    (num: number, current: Position): Position => ({
      ...current,
      vertical: current.vertical - num,
    }),
  ],
  [
    "down",
    (num: number, current: Position): Position => ({
      ...current,
      vertical: current.vertical + num,
    }),
  ],
]);

const finalPosition = data.reduce(
  (previousPosition, direction): Position => {
    const act = actions.get(direction.action);
    if (!act) {
      console.log(`no action for ${direction}`);
      return previousPosition;
    }
    return act(direction.unit, previousPosition);
  },
  { horisontal: 0, vertical: 0 }
);

console.log(
  `final position ${finalPosition.horisontal}:${finalPosition.vertical} = ${
    finalPosition.horisontal * finalPosition.vertical
  }`
);
