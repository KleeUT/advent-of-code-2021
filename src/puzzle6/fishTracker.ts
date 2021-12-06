// look at initial input

function decrementGeneration(bucket: Map<number, number>): Map<number, number> {
  const newBucket = new Map([
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
  ]);
  for (let i = 0; i < 8; i++) {
    newBucket.set(i, bucket.get(i + 1) || 0);
  }
  return newBucket;
}

export function predictFishNumbers(
  input: number[],
  numberOfDays: number
): number {
  let bucketed: Map<number, number> = input.reduce(
    (buckets, fish) => {
      const currentFishValue = buckets.get(fish) || 0;
      buckets.set(fish, currentFishValue + 1);
      return buckets;
    },
    new Map([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ])
  );
  for (let day = 0; day < numberOfDays; day++) {
    const zeroDaysLeft = bucketed.get(0) || 0;
    bucketed = decrementGeneration(bucketed);
    const sixes = bucketed.get(6) || 0;
    bucketed.set(6, sixes + zeroDaysLeft);
    bucketed.set(8, zeroDaysLeft);
  }
  if (!bucketed) {
    throw new Error("Empty bucket");
  }
  const total = [0, 1, 2, 3, 4, 5, 6, 7, 8].reduce((count, num) => {
    const bucketNumber = bucketed.get(num) || 0;
    return count + bucketNumber;
  }, 0);
  return total;
}
