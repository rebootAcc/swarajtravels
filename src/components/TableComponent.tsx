interface TableRow {
  "Tour Package Name": string;
  "City/State": string;
  Duration: string;
  Rate: string;
  Action: JSX.Element;
}

// Define the type for the tableData object
interface TableData {
  tableHead: string[]; // Array of column names
  tableBody: TableRow[]; // Array of rows (TableRow objects)
}

export default function TableComponent({
  tableData,
}: {
  tableData: TableData;
}) {
  const { tableHead, tableBody } = tableData;
  return (
    <table className="min-w-full border-collapse">
      <thead className="">
        <tr className="bg-[#eee] rounded-md">
          {tableHead.map((head, index) => (
            <th
              className="text-typeograph-1 text-base/[20px] xl:text-lg/[20px] xxl:text-2xl/[32px] px-4 py-2 font-normal text-left"
              key={index}
            >
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b-2 border-[#ccc]">
            {tableHead.map((header, colIndex) => {
              // TypeScript requires us to ensure that 'header' is a key of TableRow
              const key = header as keyof TableRow; // Now TypeScript knows 'header' is one of the TableRow keys

              return (
                <td
                  key={colIndex}
                  className="px-4 py-2 xl:px-6 xl:py-4 text-base/[20px] xl:text-lg/[20px] xxl:text-2xl/[32px] text-typeograph-2"
                >
                  {/* Render action buttons if the column is 'Action' */}
                  {
                    key === "Action"
                      ? row[key] // 'row[key]' will be JSX.Element for Action
                      : row[key] // For other columns, 'row[key]' will be a string or number
                  }
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
