import { PLUResult } from "./index";

type PLUSolutionProps = {
  result: PLUResult;
};

export const PLUSolution = ({ result }: PLUSolutionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">PLU Decomposition Results</h2>

      <div className="space-y-4">
        {result.steps.map((step, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-xl shadow">
            <div className="font-medium mb-2">
              Step {index + 1}: {step.action}
            </div>
            <pre className="font-mono">
              {step.matrix
                .map((row) =>
                  row.map((v) => v.toFixed(2).padStart(6)).join(" ")
                )
                .join("\n")}
            </pre>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Permutation Matrix (P):</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {result.P.map((row) =>
              row.map((v) => v.toString().padStart(6)).join("\n")
            )}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">Lower Triangular (L):</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {result.L.map((row) =>
              row.map((v) => v.toFixed(2).padStart(6)).join("\n")
            )}
          </pre>
        </div>

        <div>
          <h3 className="font-semibold">Upper Triangular (U):</h3>
          <pre className="bg-gray-100 p-2 rounded">
            {result.U.map((row) =>
              row.map((v) => v.toFixed(2).padStart(6)).join("\n")
            )}
          </pre>
        </div>
      </div>
    </div>
  );
};
