import React from "react";
import completeForm from "../../json/completeForm";
import Tooltip from "../../utils/Tooltip";

const tableHead = [
  { head: "Id" },
  { head: "Email" },
  { head: "Vehicle Type" },
  { head: "Order Date & Time" },
  { head: "Pickup Date & Time" },
  { head: "From" },
  { head: "To" },
  { head: "Note" },
];

const CompleteForm = () => {
  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl font-semibold mb-10">Complete Form</h1>
        <div className="overflow-x-auto">
          <table className="table-auto bg-white w-full border-collapse border border-gray-300">
            <thead className="bg-black text-white text-left">
              <tr className="text-white">
                {tableHead.map((item, index) => (
                  <th
                    key={index}
                    className="px-2 py-3 text-sm font-semibold text-left"
                  >
                    {item.head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {completeForm.map((data, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-2 py-3 text-[#12223D] font-normal">
                    <p className="w-10 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                      {data.id}
                    </p>
                  </td>
                  <td className="px-2 py-3 text-[#12223D] font-normal">
                    <Tooltip text={data.email} position="top">
                      <p className="w-44 overflow-hidden text-sm text-ellipsis whitespace-nowrap ">
                        {data.email}
                      </p>
                    </Tooltip>
                  </td>

                  <td className="px-2 py-3 text-[#12223D] font-normal">
                    <Tooltip text={data.vehicle} position="top">
                      <p className="w-24 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {data.vehicle}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="px-2 py-3 text-[#12223D] font-normal">
                    <Tooltip text={data.orderTimeAndDate} position="top">
                      <p className="w-32 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {data.orderTimeAndDate}
                      </p>
                    </Tooltip>
                  </td>

                  <td className="p-2">
                    <Tooltip text={data.timeAnddate} position="top">
                      <p className="w-32 text-sm text-ellipsis whitespace-nowrap">
                        {data.timeAnddate}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    <Tooltip text={data.pickup} position="top">
                      <p className="w-44 text-sm overflow-hidden text-ellipsis whitespace-wrap line-clamp-2">
                        {data.pickup}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    <Tooltip text={data.dropOf} position="top">
                      <p className="w-44 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {data.dropOf}
                      </p>
                    </Tooltip>
                  </td>
                  <td className="p-2">
                    <Tooltip text={data.notes} position="top">
                      <p className="w-44 overflow-hidden text-sm text-ellipsis whitespace-wrap line-clamp-2">
                        {data.notes}
                      </p>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CompleteForm;
