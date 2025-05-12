def simpsons_rule(f, a, b, n):
    """
    Composite Simpson's Rule for numerical integration.

    Parameters:
    - f: function to integrate
    - a: lower limit
    - b: upper limit
    - n: number of subintervals (must be even)

    Returns:
    - Approximate integral of f from a to b
    """
    if n % 2 != 0:
        raise ValueError(
            "Simpson's rule requires an even number of intervals (n must be even)"
        )

    h = (b - a) / n
    total = f(a) + f(b)

    for i in range(1, n):
        weight = 4 if i % 2 != 0 else 2
        total += weight * f(a + i * h)

    return total * h / 3


if __name__ == "__main__":
    import numpy as np

    # Example function to integrate
    def f(x):
        return np.sin(x)

    a = 0  # Lower limit
    b = np.pi  # Upper limit
    n = 1000  # Number of subintervals (must be even)

    result = simpsons_rule(f, a, b, n)
    print(f"Approximate integral of sin(x) from {a} to {b}: {result}")
