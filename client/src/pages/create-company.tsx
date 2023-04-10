import { useState } from 'react'
import { useGetIdentity } from '@pankod/refine-core'
import { FieldValues, useForm } from '@pankod/refine-react-hook-form'
// import { useNavigate } from '@pankod/refine-react-router-v6'
import Form from 'components/common/Form'

const CreateCompany = () => {
 // const navigate = useNavigate()
  const { data: user } = useGetIdentity()
  const [companyImage, setCompanyImage] = useState({name: '', url: ''})
  const { refineCore: { onFinish, formLoading }, register, handleSubmit} = useForm()

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) => new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.readAsDataURL(readFile);
    });

    reader(file).then((result: string) => setCompanyImage({ name: file?.name, url: result }));
  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!companyImage.name) return alert('Please upload a gig file');

    await onFinish({ ...data, photo: companyImage.url, email: user.email });
  }

  return (
    <Form
      type='Create'
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      companyImage={companyImage}
    />
  )
}

export default CreateCompany