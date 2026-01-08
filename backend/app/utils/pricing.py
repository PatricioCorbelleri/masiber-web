def calculate_price(cost_usd: float, margin_value: float, margin_type: str):
    if cost_usd is None or margin_value is None or not margin_type:
        return None

    if margin_type == "PERCENT":
        return round(cost_usd * (1 + margin_value / 100), 2)

    if margin_type == "FIXED":
        return round(cost_usd + margin_value, 2)

    return None



def apply_bulk_change(
    current: float | None,
    action: str,     # INCREASE | DECREASE
    type_: str,      # PERCENT | FIXED
    value: float,
) -> float | None:
    if current is None:
        return None

    sign = 1 if action == "INCREASE" else -1

    if type_ == "PERCENT":
        return round(current * (1 + sign * value / 100), 2)

    if type_ == "FIXED":
        return round(current + sign * value, 2)

    return current
