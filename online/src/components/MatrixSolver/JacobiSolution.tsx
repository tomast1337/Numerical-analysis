type JacobiResult = {
  steps: {
    iteration: number;
    x: number[];
    error?: number;
  }[];
  solution: number[];
};

type JacobiSolutionProps = {
  result: JacobiResult;
};

export const JacobiSolution = ({ result }: JacobiSolutionProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Gauss-Jacobi Iterative Method</h2>

      <div className="bg-gray-100 p-4 rounded-xl">
        <h3 className="font-semibold mb-2">Final Solution:</h3>
        <div className="flex space-x-4">
          {result.solution.map((val, i) => (
            <div key={i} className="font-mono">
              x{i + 1} = {val.toFixed(6)}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold">Iterations:</h3>
        <div className="overflow-auto max-h-96">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Iteration</th>
                {result.solution.map((_, i) => (
                  <th key={i} className="px-4 py-2">
                    x{i + 1}
                  </th>
                ))}
                <th className="px-4 py-2">Error</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.steps.map((step, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2 text-center">{step.iteration}</td>
                  {step.x.map((val, i) => (
                    <td key={i} className="px-4 py-2 text-center font-mono">
                      {val.toFixed(6)}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-center font-mono">
                    {step.error ? step.error.toExponential(4) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
