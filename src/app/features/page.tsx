const Features = () => {
  return (
    <>
      <div className="relative mr-[5px] mt-10 flex h-[650px] items-center justify-center overflow-x-auto bg-transparent max-[1200px]:w-screen sm:rounded-lg lg:ml-[270px]">
        <div className="relative overflow-auto shadow-md sm:rounded-lg">
          <table className="h-[600px] w-[1000px] overflow-x-auto text-left text-sm text-gray-500 rtl:text-right">
            <thead className="bg-[#daeafb] text-xs uppercase text-gray-700">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-6 text-[28px]"
                >
                  Features
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-6 py-3 text-[28px]"
                >
                  Applicable For
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-gray-900">
                      Attendance
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-[#526484]">
                    Enable or disable Attendance Module globally or for
                    individual user roles. <br /> Note that disabling Attendance
                    module for individual profile users will
                    <br /> not stop absent notifications to students or parents.
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Admin
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Teachers
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Students
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Parents
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-gray-900">
                      Assessment & Gradings
                    </span>
                  </label>

                  <p className="mt-3 text-[14px] text-[#526484]">
                    Enable or disable Assessment & Grading globally or for
                    individual user
                    <br /> roles. Note that disabling Assessment & Grading
                    module for individual <br />
                    profile users will not stop absent notifications to students
                    or parents
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Admin
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Teachers
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Students
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Parents
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-gray-900">
                      Events
                    </span>
                  </label>
                  Events
                  <p className="mt-3 text-[14px] text-[#526484]">
                    Enable or disable Events Module globally or for individual
                    user roles.
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Admin
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Teachers
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Students
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Parents
                    </span>
                  </div>
                </td>
              </tr>
              <tr className="border-b bg-white hover:bg-gray-50">
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-[25px] font-medium text-gray-900"
                >
                  <label className="inline-flex cursor-pointer items-center">
                    <input type="checkbox" value="" className="peer sr-only" />
                    <div className="peer relative h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full"></div>
                    <span className="ms-3 whitespace-nowrap text-[25px] font-medium text-gray-900">
                      Fees & Invoicing
                    </span>
                  </label>
                  <p className="mt-3 text-[14px] text-[#526484]">
                    Enable or disable Fee & Invoicing Module globally or for
                    individual
                    <br /> user roles. Note that any invoice notifications sent
                    to disabled user
                    <br /> profiles dont stop sending emails, SMS, or mobile app
                    push notifications
                  </p>
                </th>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Admin
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Students
                    </span>
                    <span className="flex items-center gap-2">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      Parents
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Features;
