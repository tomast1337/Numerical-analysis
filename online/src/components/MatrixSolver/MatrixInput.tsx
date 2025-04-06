import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

type MatrixInputProps = {
  matrixA: number[][];
  vectorB: number[];
  size: number;
  onMatrixChange: (i: number, j: number, value: string) => void;
  onVectorChange: (i: number, value: string) => void;
};

export const MatrixInput = ({
  matrixA,
  vectorB,
  size,
  onMatrixChange,
  onVectorChange,
}: MatrixInputProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center">
          Matrix {size}×{size}
        </h1>
      </CardHeader>
      <CardContent className="flex flex-row gap-4 items-center justify-center">
        <div className="space-y-3">
          <Label className="text-lg">Matrix A</Label>
          <div className="space-y-2">
            {matrixA.map((row, i) => (
              <div key={i} className="flex gap-2">
                {row.map((val, j) => (
                  <Input
                    key={`${i}-${j}`}
                    type="number"
                    className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={val}
                    onChange={(e) => onMatrixChange(i, j, e.target.value)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-lg">Vector b</Label>
          <div className="grid gap-2">
            {vectorB.map((val, i) => (
              <Input
                key={i}
                type="number"
                className="w-16 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={val}
                onChange={(e) => onVectorChange(i, e.target.value)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
