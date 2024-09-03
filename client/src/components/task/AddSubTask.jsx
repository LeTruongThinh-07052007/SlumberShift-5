import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { useCreateSubTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const [addSbTask] = useCreateSubTaskMutation();

   const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ data, id }).unwrap();
     toast.success(res.message);
     setTimeout(() => {
        setOpen(false);
    }, 500);
   } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
 };

  

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            THÊM NHIỆM VỤ PHỤ
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Tiêu đề'
              type='text'
              name='title'
              label='Tiêu đề'
              className='w-full rounded'
              register={register("title", {
                required: "Hãy nhập tiêu đề của nhiệm vụ phụ!",
              })}
              error={errors.title ? errors.title.message : ""}
            />

            <div className='flex items-center gap-4'>
              <Textbox
                placeholder='Date'
                type='date'
                name='date'
                label='Deadline'
                className='w-full rounded'
                register={register("date", {
                  required: "Date is required!",
                })}
                error={errors.date ? errors.date.message : ""}
              />
              <Textbox
                placeholder='Note'
                type='text'
                name='tag'
                label='Note'
                className='w-full rounded'
                register={register("tag", {
                  required: "Hãy nhập note của nhiệm vụ phụ!",
                })}
                error={errors.tag ? errors.tag.message : ""}
              />
            </div>
          </div>
          <div className='py-3 mt-4 flex sm:flex-row-reverse gap-4'>
            <Button
              type='submit'
              className='bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'
              label='Thêm nhiệm vụ phụ'
            />

            <Button
              type='button'
              className='bg-white border text-sm font-semibold text-gray-900 sm:w-auto'
              onClick={() => setOpen(false)}
              label='Thoát'
            />
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddSubTask;