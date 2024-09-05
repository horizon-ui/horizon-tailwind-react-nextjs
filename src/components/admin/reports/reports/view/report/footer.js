const Footer = () => {
  return (
    <div className="p-4 px-20 my-2 border-t border-gray-700 py-2 ">
      <div className="flex justify-between items-center">
        <div>
          <p>Thanks for Reference</p>
          <section>
            <img
              className="w-20"
              src="https://www.signwell.com/assets/vip-signatures/muhammad-ali-signature-3f9237f6fc48c3a04ba083117948e16ee7968aae521ae4ccebdfb8f22596ad22.svg"
            />
            <p className="mb-1">Lab Technician</p>
            <p className="mb-0">(DMLT, BMLT)</p>
          </section>
        </div>
        <div>
          <p>***End of Report***</p>
          <section className="mt-4">
            <img
              className="w-20"
              src="https://www.fillhq.com/wp-content/uploads/2021/11/Handwritten-Signature--1024x637.png"
            />
            <p className="mb-1">Raghu Dutta</p>
            <p className="mb-0">MD, Pathologist)</p>
          </section>
        </div>
        <div>
          <section className="mt-8">
            <img
              className="w-20"
              src="https://www.wisestamp.com/wp-content/uploads/2020/08/Oprah-Winfrey-Signature-1.png"
            />
            <p className="mb-1">Avinash</p>
            <p className="mb-0">(MD, Pathologist)</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Footer;
