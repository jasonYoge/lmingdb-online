import { Button, Form, Input, Progress } from "@nextui-org/react";
import { useMemoizedFn } from 'ahooks';
import { jsPDF } from 'jspdf';
import { Layout } from "../../components/layout";
import { useState } from "react";
import { useCloudBase } from "../../hooks/use-cloud-base";

const LogoImg = 'data:image/jpeg;base64,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';

const pdf = new jsPDF();

export default function Upload() {
  const { upload } = useCloudBase();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const onSubmit = useMemoizedFn(async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    const { number } = data;
    const pdfBlob = pdf.output('blob');
    const pdfName = `湖南省华湘仕工程担保有限公司_${number}`;
    
    try {
      setLoading(true);
      await upload(pdfName, pdfBlob, ({ loaded, total }) => {
        setProgress(loaded ?? 0 / total)
      });
      alert('上传成功！');
    } catch (error) {
      alert('上传失败！');
    } finally {
      setLoading(false);
    }
  });

  const handleImageChange = useMemoizedFn(async (event) => {
    const files = event.target.files;
    const resolvedImages = [] as any[];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = event.target.files[i];
        if (file && file.type.startsWith('image/')) {
          // 读取图片并设置为状态
          resolvedImages.push(new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
              if (!e.target) {
                return;
              }
              const img = document.createElement('img');
              const fileUrl = URL.createObjectURL(file);
              img.src = fileUrl;

              pdf.addImage(img, 'PNG', 10, 0, 190, 0, '', 'NONE', 0);
              pdf.addImage(LogoImg, 'PNG', 0, 0, 0, 20, '', 'NONE', 0);
              if (i !== files.length - 1) {
                pdf.addPage();
              }
              resolve(fileUrl);
            };
            reader.readAsDataURL(file);
          }));
        }
      }

      const images = await Promise.all(resolvedImages);
      setImages(images);
    } catch (error) {
      alert('上传失败');
    }
  });

  return (
    <Layout title="湖南省华湘仕工程担保有限公司-上传管理">
      <h2 className="font-bold text-2xl text-gray-600 text-center mt-8">上传管理工具</h2>
      <Form
        className="w-full md:w-max-[400px] flex flex-col gap-8 mt-8"
        validationBehavior="native"
        onSubmit={onSubmit}
      >
        <Input
          isRequired
          className="w-full"
          size="lg"
          labelPlacement="outside"
          name="number"
          type="text"
          placeholder="保函(保单)编号"
          validate={(value) => {
            if (!value) {
              return "请输入保函(保单)编号";
            }
          }}
        />
        <Input
          isRequired
          className="w-full"
          size="lg"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <Button isLoading={loading} size="lg" className="mt-8 w-full md:w-[320px]" color="primary" type="submit" isDisabled={images.length === 0}>
          生成PDF
        </Button>
      </Form>
      {
        progress !== 0 && progress < 1 &&
          <Progress
            color="warning"
            showValueLabel={true}
            size="lg"
            value={Math.max(Math.min(0, progress * 100), 100)}
          />
      }
      {
        images.length !== 0 &&
          <div className="mt-8">
            <p className="font-semibold text-xl text-gray-700">图片预览</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map(i => {
                return <img className="w-full h-auto border border-solid border-gray-300" src={i} key={i} />
              })}
            </div>
          </div>
      }
    </Layout>
  );
}