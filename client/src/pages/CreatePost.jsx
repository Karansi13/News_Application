// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import DOMPurify from "dompurify";
// import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import { useNavigate } from "react-router-dom";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase";

// export default function CreatePost() {
//   const [file, setFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const [imageUploadProgress, setImageUploadProgress] = useState(null);
//   const [videoUploadProgress, setVideoUploadProgress] = useState(null);
//   const [imageUploadError, setImageUploadError] = useState(null);
//   const [videoUploadError, setVideoUploadError] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "uncategorized",
//     image: "",
//     video: "",
//   });
//   const [publishError, setPublishError] = useState(null);

//   const navigate = useNavigate();

//   const handleUploadImage = async () => {
//     try {
//       if (!file) {
//         setImageUploadError("Please select an image");
//         return;
//       }
//       setImageUploadError(null);
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + "-" + file.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setImageUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setImageUploadError("Image upload failed");
//           setImageUploadProgress(null);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImageUploadProgress(null);
//             setImageUploadError(null);
//             setFormData({ ...formData, image: downloadURL });
//           });
//         }
//       );
//     } catch (error) {
//       setImageUploadError("Image upload failed");
//       setImageUploadProgress(null);
//       console.log(error);
//     }
//   };

//   const handleUploadVideo = async () => {
//     try {
//       if (!videoFile) {
//         setVideoUploadError("Please select a video");
//         return;
//       }
//       setVideoUploadError(null);
//       const storage = getStorage(app);
//       const fileName = new Date().getTime() + "-" + videoFile.name;
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, videoFile);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setVideoUploadProgress(progress.toFixed(0));
//         },
//         (error) => {
//           setVideoUploadError("Video upload failed");
//           setVideoUploadProgress(null);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setVideoUploadProgress(null);
//             setVideoUploadError(null);
//             setFormData({ ...formData, video: downloadURL });
//           });
//         }
//       );
//     } catch (error) {
//       setVideoUploadError("Video upload failed");
//       setVideoUploadProgress(null);
//       console.log(error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Sanitize and strip HTML tags from content
//     const sanitizedContent = DOMPurify.sanitize(formData.content, {
//       USE_PROFILES: { html: false },
//     });

//     try {
//       const res = await fetch("/api/post/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...formData, content: sanitizedContent }),
//       });
//       const data = await res.json();
//       console.log(data);

//       if (!res.ok) {
//         setPublishError(data.message || "Failed to publish the post.");
//         return;
//       }

//       setPublishError(null);
//       navigate(`/post/${data.slug}`);
//     } catch (error) {
//       console.error("Publish Error:", error);
//       setPublishError("Something went wrong while publishing.");
//     }
//   };

//   return (
//     <div className="p-3 max-w-3xl mx-auto min-h-screen">
//       <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-4 sm:flex-row justify-between">
//           <TextInput
//             type="text"
//             placeholder="Title"
//             required
//             id="title"
//             className="flex-1"
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//           <Select
//             onChange={(e) =>
//               setFormData({ ...formData, category: e.target.value })
//             }
//           >
//             <option value="uncategorized">Select a category</option>
//             <option value="top-headlines">Top Headlines</option>
//             <option value="cultural">Cultural</option>
//             <option value="bank-nifty-sensex">Bank Nigty/ Sensex</option>
//             <option value="education">Education</option>
//             <option value="bollywood-hollywood">Bollywood/ Hollywood</option>
//             <option value="health">Health</option>
//             <option value="international-news">International News</option>
//           </Select>
//         </div>
//         <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
//           <FileInput
//             type="file"
//             accept="image/*"
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <Button
//             type="button"
//             gradientDuoTone="purpleToBlue"
//             size="sm"
//             outline
//             onClick={handleUploadImage}
//             disabled={imageUploadProgress}
//           >
//             {imageUploadProgress ? (
//               <div className="w-16 h-16">
//                 <CircularProgressbar
//                   value={imageUploadProgress}
//                   text={`${imageUploadProgress || 0}%`}
//                 />
//               </div>
//             ) : (
//               "Upload Image"
//             )}
//           </Button>
//         </div>
//         {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
//         {formData.image && (
//           <img
//             src={formData.image}
//             alt="upload"
//             className="w-full h-72 object-cover"
//           />
//         )}
//         <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
//           <FileInput
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideoFile(e.target.files[0])}
//           />
//           <Button
//             type="button"
//             gradientDuoTone="purpleToBlue"
//             size="sm"
//             outline
//             onClick={handleUploadVideo}
//             disabled={videoUploadProgress}
//           >
//             {videoUploadProgress ? (
//               <div className="w-16 h-16">
//                 <CircularProgressbar
//                   value={videoUploadProgress}
//                   text={`${videoUploadProgress || 0}%`}
//                 />
//               </div>
//             ) : (
//               "Upload Video"
//             )}
//           </Button>
//         </div>
//         {videoUploadError && <Alert color="failure">{videoUploadError}</Alert>}
//         {formData.video && (
//           <video
//             src={formData.video}
//             controls
//             className="w-full h-72 object-cover"
//           />
//         )}
//         <ReactQuill
//           theme="snow"
//           placeholder="Write something..."
//           className="h-72 mb-12"
//           required
//           onChange={(value) => {
//             setFormData({ ...formData, content: value });
//           }}
//         />
//         <Button type="submit" gradientDuoTone="purpleToPink">
//           Publish
//         </Button>
//         {publishError && (
//           <Alert className="mt-5" color="failure">
//             {publishError}
//           </Alert>
//         )}
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [videoUploadProgress, setVideoUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [videoUploadError, setVideoUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "uncategorized",
    image: "",
    video: "",
  });
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleUploadVideo = async () => {
    try {
      if (!videoFile) {
        setVideoUploadError("Please select a video");
        return;
      }
      setVideoUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + videoFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, videoFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setVideoUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setVideoUploadError("Video upload failed");
          setVideoUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setVideoUploadProgress(null);
            setVideoUploadError(null);
            setFormData({ ...formData, video: downloadURL });
          });
        }
      );
    } catch (error) {
      setVideoUploadError("Video upload failed");
      setVideoUploadProgress(null);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize and strip HTML tags from content
    const sanitizedContent = DOMPurify.sanitize(formData.content, {
      USE_PROFILES: { html: false },
    });

    // Check if required fields are filled
    if (!formData.title || !sanitizedContent || !formData.category) {
      setPublishError("Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, content: sanitizedContent }),
      });
      const data = await res.json();
      console.log(data);

      if (!res.ok) {
        setPublishError(data.message || "Failed to publish the post.");
        return;
      }

      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      console.error("Publish Error:", error);
      setPublishError("Something went wrong while publishing.");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleInputChange}
          />
          <Select id="category" onChange={handleSelectChange}>
            <option value="uncategorized">Select a category</option>
            <option value="top-headlines">Top Headlines</option>
            <option value="cultural">Cultural</option>
            <option value="bank-nifty-sensex">Bank Nigty/ Sensex</option>
            <option value="education">Education</option>
            <option value="bollywood-hollywood">Bollywood/ Hollywood</option>
            <option value="health">Health</option>
            <option value="international-news">International News</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadVideo}
            disabled={videoUploadProgress}
          >
            {videoUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={videoUploadProgress}
                  text={`${videoUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Video"
            )}
          </Button>
        </div>
        {videoUploadError && <Alert color="failure">{videoUploadError}</Alert>}
        {formData.video && (
          <video
            src={formData.video}
            controls
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
}
