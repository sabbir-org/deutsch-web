import { Outlet, useNavigate } from "react-router";
import Preview from "../../components/Preview";
import { useUploadStore } from "../../store/uploadStore";

const Add = () => {
  const { isShowPreview } = useUploadStore();
  const { postDialog, previewData } = useUploadStore();
  const navigate = useNavigate();
  return (
    <div>
      <div className={`flex gap-x-2 justify-center mb-4`}>
        <button onClick={() => navigate("/add")}>Dialog</button>
        <button onClick={() => navigate("/add/narration")}>Narration</button>
      </div>
      <Outlet />
      {isShowPreview && (
        <Preview
          previewDataPassed={previewData}
          uploadFunction={postDialog}
        ></Preview>
      )}
    </div>
  );
};
export default Add;
