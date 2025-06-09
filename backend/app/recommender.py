# backend/app/recommender.py
from typing import List
from app.models import Property

def recommend_properties(user_properties: List[Property], all_properties: List[Property]) -> List[Property]:
    recommended = []
    user_types = {p.type for p in user_properties}
    user_locations = {(p.latitude, p.longitude) for p in user_properties}

    for prop in all_properties:
        if prop.owner_id in {p.owner_id for p in user_properties}:
            # حذف ملک‌های خود کاربر از پیشنهادها
            continue
        # شرط ساده: پیشنهاد بر اساس نوع ملک که کاربر علاقه دارد
        if any(t.value in (prop.interested_in_types or "") for t in user_types):
            recommended.append(prop)

    return recommended[:20]  # محدود به ۲۰ ملک پیشنهادی
