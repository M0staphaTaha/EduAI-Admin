const Exams = () => {
  return (
    <>
      <div className="grid w-[500px] rounded-xl bg-white p-5 max-[1342px]:w-full">
        <div className="mb-5 flex justify-between">
          <h1 className="font-sans font-semibold text-gray-800">
            All Exam Result
          </h1>
        </div>
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-[#daeafb] text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Name School
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  Code
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  About
                </th>
                <th scope="col" className="whitespace-nowrap px-6 py-3">
                  view
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  Nahda
                </th>
                <td className="whitespace-nowrap px-6 py-4">C45121</td>
                <td className="whitespace-nowrap px-6 py-4">This is text</td>
                <td className="whitespace-nowrap px-6 py-4">kdsk</td>
              </tr>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
                >
                  Nahda
                </th>
                <td className="whitespace-nowrap px-6 py-4">C45121</td>
                <td className="whitespace-nowrap px-6 py-4">This is text</td>
                <td className="whitespace-nowrap px-6 py-4">sdsdd</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Exams;
