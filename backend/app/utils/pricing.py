def calculate_price(cost_usd: float, margin_value: float, margin_type: str) -> float | None:
    if cost_usd is None or margin_value is None:
        return None

    if margin_type == "PERCENT":
        return round(cost_usd * (1 + margin_value / 100), 2)

    if margin_type == "FIXED":
        return round(cost_usd + margin_value, 2)

    return None
