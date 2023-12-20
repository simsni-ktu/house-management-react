import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IssueType } from "../../constants/enums/IssueType";
import { Api } from "../../api/api";
import { convertToListing } from "../../utils/formConverter";

function AddListing() {
  const { register, handleSubmit } = useForm<ListingForm>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  const onSubmit: SubmitHandler<ListingForm> = (data) => {
    console.log(data);
    console.log(convertToListing("1", id, data))
    if (id !== undefined) {
      setLoading(true);
      Api.postListing("1", convertToListing("1", id, data)).then(() => {
        setLoading(false);
        navigate("/listings");
      });
    }
  };
  return loading ? (
    <div role="status" className="flex h-64 justify-center items-center">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <div className="flex flex-col items-center ">
      <h1 className="pt-8 pb-8 text-3xl font-bold">Add listing</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center bg-white rounded-2xl p-16"
      >
        <input
          type="number"
          {...register("price")}
          className="mb-4 p-2 rounded border border-gray-500"
          placeholder="Price"
        />
        <input
          type="date"
          {...register("fix_deadline")}
          className="mb-4 p-2 w-full rounded border border-gray-500"
          placeholder="Fix deadline"
        />
        <select
          className="mb-4 p-2 w-full rounded border border-gray-500"
          {...register("issue_type")}
        >
          <option value={IssueType.waterLeakage}>
            {IssueType.waterLeakage}
          </option>
          <option value={IssueType.electrical}>{IssueType.electrical}</option>
          <option value={IssueType.windowRepair}>
            {IssueType.windowRepair}
          </option>
          <option value={IssueType.other}>{IssueType.other}</option>
        </select>

        <input
          {...register("description", {})}
          className="mb-4 p-2 rounded border border-gray-500"
          placeholder="Description"
        />
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
}

export default AddListing;