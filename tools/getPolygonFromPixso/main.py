from data import pixso_data

class PolygonCalculator:
    def __init__(self, pixso_data):
        """
        初始化 PolygonCalculator 实例。

        Args:
            pixso_data: 嵌套列表数据，每个子列表包含图形和多边形顶点信息。
        """
        self.pixso_data = pixso_data

    def format_percentage(self, value):
        """格式化百分比，将 0.00% 简写为 0。"""
        return f"{value:.2f}%" if value != 0 else "0"

    def calculate_polygon_attributes(self):
        """
        计算 polygon 属性值，处理嵌套列表数据。

        Returns:
            一个字符串，包含每个子列表计算得到的格式化 polygon 属性值，并用换行符分隔。
        """
        results = []
        
        for data in self.pixso_data:
            graphic_x, graphic_y, graphic_w, graphic_h, point1_x, point1_y, point2_x, point2_y, point3_x, point3_y, color = data

            # 计算相对位置
            point1_res_x = (point1_x - graphic_x) / graphic_w * 100
            point1_res_y = (point1_y - graphic_y) / graphic_h * 100
            point2_res_x = (point2_x - graphic_x) / graphic_w * 100
            point2_res_y = (point2_y - graphic_y) / graphic_h * 100
            point3_res_x = (point3_x - graphic_x) / graphic_w * 100
            point3_res_y = (point3_y - graphic_y) / graphic_h * 100

            polygon_attribute = (
                f"polygon({self.format_percentage(point1_res_x)} {self.format_percentage(point1_res_y)}, "
                f"{self.format_percentage(point2_res_x)} {self.format_percentage(point2_res_y)}, "
                f"{self.format_percentage(point3_res_x)} {self.format_percentage(point3_res_y)})"
            )
            
            # 对以em为单位的数据除以10
            graphic_x /= 10
            graphic_y /= 10
            graphic_w /= 10
            graphic_h /= 10
            
            formatted_data = f"( {graphic_x}em, {graphic_y}em, {graphic_w}em, {graphic_h}em, {color}, {polygon_attribute} ),"
            results.append(formatted_data)

        return '\n'.join(results)

def main():
    calculator = PolygonCalculator(pixso_data)
    polygon_attributes = calculator.calculate_polygon_attributes()
    print(polygon_attributes)

if __name__ == "__main__":
    main()
