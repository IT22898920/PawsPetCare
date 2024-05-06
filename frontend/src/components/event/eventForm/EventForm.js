import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./EventForm.scss"
import Card from "../../card/Card";

const EventForm = ({
    event, 
    eventImage, 
    imagePreview, 
    description, 
    setDescription, 
    handleInputChange, 
    handleImageChange, 
    saveEvent,
}) => {

    return (
    <div className="add-event">
        <Card cardClass={"card"}>
            <form onSubmit={saveEvent}>
                <Card cardClass={"group"}>
                    <label>Event Image</label>
                    <code className="--color-dark">Supported Formats: jpg, jpeg, png </code>
                    <input type="file" 
                           name="image"
                        onChange={(e) => handleImageChange (e)}/>

                    {imagePreview != null ? (
                        <div className="image-preview">
                            <img src={imagePreview} 
                            alt="event" />
                        </div>
                    ) : (<p> No image set for this event. </p>)
                    }
                </Card>

                <label>Event Name:</label>
                <input type="text" placeholder="Event name" 
                name="name" value={event?.name} onChange={handleInputChange} />

                <label>Event Category:</label>
                <input type="text" placeholder="Event category" 
                name="category" value={event?.category} onChange={handleInputChange} />

                <label>Event Date:</label>
                <input type="date" placeholder="Event date" 
                name="date" value={event?.date} onChange={handleInputChange} />

                <label>Event Venue:</label>
                <input type="text" placeholder="Event venue" 
                name="venue" value={event?.venue} onChange={handleInputChange} />
                
                <label>Event Time:</label>
                <input type="time" placeholder="Event time" 
                name="time" value={event?.time} onChange={handleInputChange} />

                <label>Event Trainer:</label>
                <input type="text" placeholder="Event trainer" 
                name="trainer" value={event?.trainer} onChange={handleInputChange} />

                <label>Event Description:</label>
                <ReactQuill theme="snow" 
                value={description} 
                onChange={setDescription} 
                modules={EventForm.modules} 
                formats={EventForm.formats} />

                <div className="--my">
                    <button type="submit" className="--btn --btn-primary">
                        Save Event
                    </button>
                    </div> 
            </form>
        </Card>
    </div>
    );
};


EventForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  EventForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];

export default EventForm;
