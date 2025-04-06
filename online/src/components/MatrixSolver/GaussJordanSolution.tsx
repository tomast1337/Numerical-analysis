import { Step } from "./index";

type GaussJordanSolutionProps = {
  steps: Step[];
};

export const GaussJordanSolution = ({ steps }: GaussJordanSolutionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gauss-Jordan Elimination Steps</h2>
      {steps.map((step, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
          <div className="font-medium mb-2">
            Step {index + 1}: {step.action}
          </div>
          <pre className="font-mono">
            {step.matrix
              .map((row) => row.map((v) => v.toFixed(2).padStart(6)).join(" "))
              .join("\n")}
          </pre>
        </div>
      ))}
    </div>
  );
};
