import { Button, Form, Input } from "@nextui-org/react";
import { useMemoizedFn } from  'ahooks';
import { Layout } from "../../components/layout";
import { useCloudBase } from "../../hooks/use-cloud-base";

export default function Search() {
  const { downloadFile } = useCloudBase();

  const onSubmit = useMemoizedFn(async (e: any) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any);
    const { number } = data;

    try {
      await downloadFile(number);
      window.location.href = `//6c6d-lmingdb-2gfglj1s626cc70f-1251844431.tcb.qcloud.la/%E6%B9%96%E5%8D%97%E7%9C%81%E5%8D%8E%E6%B9%98%E4%BB%95%E5%B7%A5%E7%A8%8B%E6%8B%85%E4%BF%9D%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8_${number}`;
    } catch (e) {
      alert('查询失败，未找到对应的保函');
    }
  });

  return (
    <Layout title="湖南省华湘仕工程担保有限公司-保函查询">
      <h2 className="font-bold text-2xl text-gray-600 text-center mt-8">保函查询</h2>
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
        <Button size="lg" className="w-full" color="primary" type="submit">
          查询
        </Button>
      </Form>
      <div className="flex flex-col gap-4 mt-8 text-gray-500">
        <p className="font-semibold text-xl text-gray-700">查询须知</p>
        <p>1、本系统可提供保函真伪查询</p>
        <p>2、企业名称请输入全称，参见保函正文说明</p>
        <p>3、如需保函扫描件请联系业务经办客户经理</p>
        <p>4、如有异议请联系业务经办客户经理或保函办理机构</p>
      </div>
    </Layout>
  );
}