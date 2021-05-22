import base64
from io import BytesIO
from pathlib import Path
import sys

try:
    from PIL import Image
except ModuleNotFoundError:
    print("PIL required", file=sys.stderr)
    sys.exit(1)


if __name__ == "__main__":

    root_dir = Path(__file__).resolve().parents[1]
    app_dir = root_dir / "app"
    static_dir = app_dir / "static"
    cropped_dir = static_dir / "cropped"

    cropped_images = cropped_dir.glob("*.png")
    cropped_images = sorted([str(i) for i in cropped_images])

    for cropped_image in cropped_images:
        buffer = BytesIO()
        image = Image.open(cropped_image)
        image.save(buffer, format="png")
        base64_image = base64.b64encode(buffer.getvalue()).decode("ascii")
        print(f"        'data:image/png;base64,{base64_image}',")
