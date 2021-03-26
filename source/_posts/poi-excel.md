---
title: poi导出excel效率优化
date: 2018-11-13 10:18:32
tags: Java
categories: 码不能停
---

最近抄了个poi的数据导出，500条数据跑了将近50秒，wtf???

一番百度，发现是设置列宽写成了设置格宽，本来20列的数据，只需要设置20次就够了，但是现在就要跑20*500次，而设置宽度本身又是个比较消耗资源的操作，好死不死的是我还做了中文宽度适配，so…fuck the dogs

![cover](/images/cover.jpeg)
<!--more-->

```java
public class ExcelUtil {
    public HSSFWorkbook export(String sheetName, String[] title, String[] fields, List data,
            HSSFWorkbook wb) throws Exception {

        // 创建一个HSSFWorkbook，对应一个Excel文件
        if (wb == null) {
            wb = new HSSFWorkbook();
        }

        // 在workbook中添加一个sheet,对应Excel文件中的sheet
        HSSFSheet sheet = wb.createSheet(sheetName);


        // 在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制
        HSSFRow row = sheet.createRow(0);

        // 创建单元格，并设置值表头 设置表头居中
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.CENTER);
        // 声明列对象
        HSSFCell cell = null;

        // 创建标题
        for (int i = 0; i < title.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }

        HSSFCell contentCell = null;
        for (int i = 0; i < data.size(); i++) {
            // 数据集
            Object obj = data.get(i);
            // 创建行
            row = sheet.createRow(i + 1);

            for (int k = 0; k < fields.length; k++) {
                Method method = obj.getClass().getMethod("get" + fields[k], new Class[] {});
                Object value = method.invoke(obj, new Object[] {});
                contentCell = row.createCell(k);
                if (value instanceof Date) {
                    Date date = (Date) value;
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    contentCell.setCellValue(sdf.format(date));
                } else if (value instanceof BigDecimal) {
                    HSSFCellStyle cellStyle = wb.createCellStyle();
                    HSSFDataFormat format = wb.createDataFormat();
                    contentCell.setCellValue(((BigDecimal) value).doubleValue());
                    cellStyle.setDataFormat(format.getFormat("¥#,##0.00"));
                    contentCell.setCellStyle(cellStyle);
                }else if(value == null || value ==""){
                    contentCell.setCellValue("--");
                } else {
                    contentCell.setCellValue(value.toString());
                }
            }
        }
//        设置列宽自适应
        for (int l = 0; l < fields.length; l++) {
            sheet.autoSizeColumn(l + 1, true);
            int columnWidth = sheet.getColumnWidth(l) / 256;
            for (int rowNum = 0; rowNum < sheet.getLastRowNum(); rowNum++) {
                HSSFRow currentRow;
                // 当前行未被使用过
                if (sheet.getRow(rowNum) == null) {
                    currentRow = sheet.createRow(rowNum);
                } else {
                    currentRow = sheet.getRow(rowNum);
                }

                if (currentRow.getCell(l) != null) {
                    HSSFCell currentCell = currentRow.getCell(l);
                    if (currentCell.getCellType().toString() == "STRING") {
                        int length = currentCell.getStringCellValue().getBytes().length;
                        if (columnWidth < length) {
                            columnWidth = length;
                        }
                    }
                }
            }
            sheet.setColumnWidth(l, columnWidth * 256);
        }
        return wb;
    }

}
```


用法
```java
ExcelUtil excelUtil = new ExcelUtil();
// 列名
String[] rowsName = new String[] {"序号", "签约流水号", "订单编号", "通道", "公司", "业务员", "客户姓名", "交易金额",
        "手续费", "订单状态", "状态说明", "众签状态", "绑卡状态", "交易时间", "处理时间"};
// 字段名
String[] rowsTitle = new String[] {"Id", "ContractNo", "OrderNo", "ChannelName",
        "CompanyName", "BaseUserName", "BankAccountName", "Money", "InMoney",
        "OrderStatusForRead", "RetDesc", "OrderZQSignedStatusForRead",
        "OrderSignedStatusForRead", "TradeTime", "ProcessDate"};


List<OrderPageVO> list =
        orderMapper.listByCondition(contractNo, orderNo, userName, baseUserName, channelId,
                companyId, orderStatus, signed, tradeType, processDateBegin, processDateEnd);


HSSFWorkbook workbook = excelUtil.export("订单记录", rowsName, rowsTitle, list, null);

// 下载
try {
    String filename = "订单记录" + System.currentTimeMillis() + ".xls";
    filename = new String(filename.getBytes(), "ISO8859-1");
    response.setContentType("application/octet-stream;charset=ISO8859-1");
    response.setHeader("Content-Disposition", "attachment;filename=" + filename);
    response.addHeader("Pargam", "no-cache");
    response.addHeader("Cache-Control", "no-cache");
    OutputStream os = response.getOutputStream();
    workbook.write(os);
    os.flush();
    os.close();
} catch (Exception e) {
    e.printStackTrace();
}
```

poi用法还是很简单的，也就这个地方被我踩了个坑。另外数据量上来以后可能还有分sheet的坑在等着我，不过这个以后再说。