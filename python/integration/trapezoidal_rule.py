def trapezoidal_rule(f, a, b, n):
    """
    Composite Trapezoidal Rule for numerical integration.

    Parameters:
    - f: function to integrate
    - a: lower limit
    - b: upper limit
    - n: number of subintervals (must be >= 1)

    Returns:
    - Approximate integral of f from a to b
    """
    h = (b - a) / n
    total = 0.5 * (f(a) + f(b))

    for i in range(1, n):
        total += f(a + i * h)

    return total * h


if __name__ == "__main__":
    import numpy as np

    # Example function to integrate
    def f(x):
        return np.sin(x)

    a = 0  # Lower limit
    b = np.pi  # Upper limit
    n = 1000  # Number of subintervals

    result = trapezoidal_rule(f, a, b, n)
    print(f"Approximate integral of sin(x) from {a} to {b}: {result}")
