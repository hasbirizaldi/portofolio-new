import { IoSend } from "react-icons/io5";
import { assetsImg } from "../assets/img/assets";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_ky7sx8d", "template_prybchn", form.current, {
        publicKey: "D_X0CeD9ykT927ySE",
      })
      .then(
        () => {
          toast.success("Pesan berhasil dikirim!", {
            position: "top-right",
            autoClose: 3000,
          });
          // Kosongkan form setelah sukses
          form.current.reset();
        },
        (error) => {
          toast.error("Gagal mengirim pesan. Coba lagi nanti.", {
            position: "top-right",
            autoClose: 3000,
          });
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <section id="contact" className="min-h-[90vh] bg-[#fdfaf6] dark:bg-slate-950 py-10 lg:px-44 px-4 duration-500 ">
      <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-200 mb-2 text-center">Contact Me</h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 mt-24">
        <div className="flex flex-col gap-9">
          <div className="flex flex-row lg:gap-8 gap-10">
            <img src={assetsImg.img_gmail} alt="Gmail" className="h-20 w-20" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-lg">Have a question?</h3>
              <p className="text-slate-500 dark:text-slate-400">I am here to help you.</p>
              <p className="text-slate-500 dark:text-slate-400">
                Email me at
                <a href="https://gmail.com" target="_blank" className="text-[#ac6b34] dark:text-cyan-500  font-semibold underline ml-2">
                  hasbirizaldi14@gmail.com
                </a>
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-8">
            <img src={assetsImg.img_map} alt="Gmail" className="w-20" />
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-slate-700 dark:text-slate-300 text-lg">Current Location</h3>
              <p className="text-slate-500 dark:text-slate-400">Bekasi, Indonesia</p>
              <p className="text-[#ac6b34] dark:text-cyan-500 font-semibold">Serving Client Worldwide</p>
            </div>
          </div>
          <div className="">
            <h1 className="text-lg text-slate-700 font-semibold my-3 dark:text-slate-300 lg:text-start text-center">Contact Me on Social Media</h1>
            <div className="flex gap-8 lg:justify-start justify-center">
              <a href="https://www.linkedin.com/in/hasbi-rizaldi-a9393a260" target="_blank">
                <FaLinkedin className=" text-4xl lg:text-5xl hover:scale-105 transition-all ease-in-out hover:brightness-125 text-blue-900 dark:text-blue-600" />
              </a>
              <a href="https://github.com/hasbirizaldi" target="_blank">
                <FaGithub className=" text-4xl lg:text-5xl hover:scale-105 transition-all ease-in-out hover:brightness-125 text-slate-800 dark:text-slate-300" />
              </a>
              <a href="https://api.whatsapp.com/send?phone=6285640402997&text=Assalamualaikum" target="_blank">
                <FaWhatsapp className=" text-4xl lg:text-5xl hover:scale-105 transition-all ease-in-out hover:brightness-125 text-green-700 dark:text-green-400" />
              </a>
              <a href="https://facebook.com/hasbi.riz" target="_blank">
                <FaFacebook className=" text-4xl lg:text-5xl hover:scale-105 transition-all ease-in-out hover:brightness-125 text-blue-700 " />
              </a>
              <a href="https://instagram.com/hasbi.rizaldi" target="_blank">
                <FaInstagram className=" text-4xl lg:text-5xl hover:scale-105 transition-all ease-in-out hover:brightness-125 text-pink-600" />
              </a>
            </div>
          </div>
        </div>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-8">
              <input
                type="text"
                name="user_name"
                required
                placeholder="Your name"
                className="w-full px-4 py-2 text-slate-600 dark:text-slate-100  border bg-white dark:bg-slate-800 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="email"
                name="user_email"
                required
                placeholder="Email address"
                className="w-full px-4 dark:text-slate-100 dark:bg-slate-800 text-slate-600  py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <textarea
                placeholder="Your message"
                required
                name="message"
                className="w-full h-40 text-slate-600 dark:text-slate-100  px-4 py-2 border bg-white dark:bg-slate-800 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>
            <button type="submit" className="w-46 flex items-center gap-2 justify-center bg-[#ac6b34] dark:bg-cyan-700 text-white py-1.5 rounded cursor-pointer shadow-btn hover:brightness-125 mt-9 text-lg font-semibold">
              Send Message <IoSend />
            </button>
            <ToastContainer />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
