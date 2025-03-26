// import { openPopup } from "../../redux/slices/pageSlice";
// import { useDispatch } from "react-redux";
// import { CustomButton } from "../../components/inputs";

// const QADashboard: React.FC = () => {
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <CustomButton
//         variant="contained"
//         onClick={() => dispatch(openPopup("complaintbrowser"))}
//       >
//         Complaint Lookup
//       </CustomButton>
//     </div>
//   );
// };

// export default QADashboard;// QADashboard.js
import React, { useState } from "react";
import Split from "react-split";

const QADashboard = () => {
  const [sizes, setSizes] = useState([50, 50]);

  const toggleLeftPane = () => {
    setSizes((prevSizes) => (prevSizes[0] === 0 ? [50, 50] : [0, 100]));
  };

  const toggleRightPane = () => {
    setSizes((prevSizes) => (prevSizes[1] === 0 ? [50, 50] : [100, 0]));
  };

  return (
    <div className="w-full h-screen">
      <Split
        className="flex h-full"
        sizes={sizes}
        minSize={[0, 0]}
        gutterSize={10}
        direction="horizontal"
        gutterAlign="center"
        cursor="col-resize"
      >
        {/* Left Pane */}
        <div
          className={`bg-gray-100 p-4 overflow-auto relative transition-all duration-300 ${
            sizes[0] === 0 ? "hidden" : "block"
          }`}
        >
          <button
            className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded shadow"
            onClick={toggleLeftPane}
          >
            {sizes[0] === 0 ? "Open Left" : "Close Left"}
          </button>
          <div className="text-center text-gray-600">Left Pane</div>
        </div>

        {/* Right Pane */}
        <div
          className={`bg-gray-200 p-4 overflow-auto relative transition-all duration-300 ${
            sizes[1] === 0 ? "hidden" : "block"
          }`}
        >
          <button
            className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded shadow"
            onClick={toggleRightPane}
          >
            {sizes[1] === 0 ? "Open Right" : "Close Right"}
          </button>
          <div className="text-center text-gray-600">Right Pane</div>
        </div>
      </Split>
    </div>
  );
};

export default QADashboard;
