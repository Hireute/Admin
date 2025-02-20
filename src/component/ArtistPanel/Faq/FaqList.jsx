import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from "react-icons/io";

const FAQList = ({ faqs, toggledIndex, toggleAccordion, onEdit, onDelete,setEditId }) => {
  return (
    <div>
      {faqs?.length > 0 ? (
        <ul className="space-y-4">
          {faqs?.map((faq, index) => (
            <li key={index} className="border rounded shadow-md">
              <div className="">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-md rounded-t-md p-2">
                    {faq.question}
                  </h3>
                  <div className="space-x-5 flex items-center">
                    {toggledIndex === index ? (
                      <IoMdRemoveCircleOutline
                        size={24}
                        color="#BFA75D"
                        className="cursor-pointer"
                        onClick={() => toggleAccordion(null)}
                      />
                    ) : (
                      <IoMdAddCircleOutline
                        size={24}
                        color="#BFA75D"
                        className="cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                      />
                    )}
                    <button onClick={() => onEdit(faq._id,index)}>
                      <FaEdit size={20} color="#BFA75D" />
                    </button>
                    <button onClick={() => onDelete(faq._id)}>
                      <AiFillDelete size={20} color="#BFA75D" />
                    </button>
                  </div>
                </div>

                {toggledIndex === index && (
                  <div>
                    <p className="text-wrap text-gray-700 rounded-b-md text-md bg-white p-2">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No FAQs available. Add one!</p>
      )}
    </div>
  );
};

export default FAQList;
