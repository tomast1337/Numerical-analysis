import { Label } from "@radix-ui/react-label";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { GaussJordanSolution } from "./GaussJordanSolution";
import { JacobiSolution } from "./JacobiSolution";
import { MatrixInput } from "./MatrixInput";
import { PLUSolution } from "./PLUSolution";
import {
  gaussJacobi,
  gaussJordanSteps,
  pluDecomposition,
} from "./solverAlgorithms";

export type Step = {
  action: string;
  matrix: number[][];
};

export type PLUResult = {
  P: number[][];
  L: number[][];
  U: number[][];
  steps: Step[];
};

export type JacobiResult = {
  steps: {
    iteration: number;
    x: number[];
    error?: number;
  }[];
  solution: number[];
};

export const MatrixSolver = () => {
  const [size, setSize] = useState<number>(3); // State for matrix size
  const [matrixA, setMatrixA] = useState<number[][]>(
    Array.from({ length: 3 }, () => Array(3).fill(0))
  );
  const [vectorB, setVectorB] = useState<number[]>(Array(3).fill(0));
  const [steps, setSteps] = useState<Step[]>([]);
  const [pluResult, setPluResult] = useState<PLUResult | null>(null);
  const [jacobiResult, setJacobiResult] = useState<JacobiResult | null>(null);
  const [activeTab, setActiveTab] = useState<"gauss" | "plu" | "jacobi">(
    "gauss"
  );

  const handleSizeChange = (newSize: string) => {
    const parsedSize = parseInt(newSize, 10);
    if (parsedSize > 0) {
      setSize(parsedSize);
      setMatrixA(
        Array.from({ length: parsedSize }, () => Array(parsedSize).fill(0))
      );
      setVectorB(Array(parsedSize).fill(0));
    }
  };

  const handleMatrixChange = (i: number, j: number, value: string) => {
    const newMatrix = matrixA.map((row) => [...row]);
    newMatrix[i][j] = parseFloat(value);
    setMatrixA(newMatrix);
  };

  const handleVectorChange = (i: number, value: string) => {
    const newVector = [...vectorB];
    newVector[i] = parseFloat(value);
    setVectorB(newVector);
  };

  const handleSolve = () => {
    const augmented = matrixA.map((row, i) => [...row, vectorB[i]]);
    const result = gaussJordanSteps(augmented);
    setSteps(result);
    setPluResult(null);
    setJacobiResult(null);
    setActiveTab("gauss");
  };

  const handlePLUDecomposition = () => {
    try {
      const result = pluDecomposition(matrixA);
      setPluResult(result);
      setSteps(result.steps);
      setJacobiResult(null);
      setActiveTab("plu");
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleJacobi = () => {
    try {
      const result = gaussJacobi(matrixA, vectorB);
      setJacobiResult(result);
      setPluResult(null);
      setActiveTab("jacobi");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Matrix may not be diagonally dominant"
      );
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Matrix Solver</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="w-full max-w-md mx-auto flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <Label htmlFor="matrix-size" className="text-lg">
                Matrix Size:
              </Label>
              <Input
                id="matrix-size"
                type="number"
                className="w-20"
                min="1"
                value={size}
                onChange={(e) => handleSizeChange(e.target.value)}
              />
            </div>

            <MatrixInput
              matrixA={matrixA}
              vectorB={vectorB}
              size={size}
              onMatrixChange={handleMatrixChange}
              onVectorChange={handleVectorChange}
            />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as "gauss" | "plu" | "jacobi")
            }
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gauss" onClick={handleSolve}>
                Gauss-Jordan
              </TabsTrigger>
              <TabsTrigger value="plu" onClick={handlePLUDecomposition}>
                PLU Decomposition
              </TabsTrigger>
              <TabsTrigger value="jacobi" onClick={handleJacobi}>
                Jacobi Method
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-6">
            {activeTab === "gauss" && steps.length > 0 && (
              <GaussJordanSolution steps={steps} />
            )}

            {activeTab === "plu" && pluResult && (
              <PLUSolution result={pluResult} />
            )}

            {activeTab === "jacobi" && jacobiResult && (
              <JacobiSolution result={jacobiResult} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
