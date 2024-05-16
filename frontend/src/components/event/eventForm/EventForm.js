import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import "./EventForm.scss";
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
                           onChange={handleImageChange}/>

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
                <select
                    name="category"
                    value={event?.category || ''}
                    onChange={handleInputChange}
                    className="custom-select">
                    <option value="">Select Category</option>
                    <option value="Dog Fetch Context">Dog Fetch Context</option>
                    <option value="Cat Fetch Context">Cat Fetch Context</option>
                    <option value="Dog Agility Course">Dog Agility Course</option>
                    <option value="Cat Agility Course">Cat Agility Course</option>
                    <option value="Dog Parade">Dog Parade</option>
                    <option value="Cat Parade">Cat Parade</option>
                </select>

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
                <select
                    name="trainer"
                    value={event?.trainer || ''}
                    onChange={handleInputChange}
                    className="custom-select">
                    <option value="">Select Trainer</option>
                    <option value="ET01 Ranugi">ET01 Ranugi</option>
                    <option value="ET02 Thilina">ET02 Thilina</option>
                    <option value="ET03 Chalana">ET03 Chalana</option>
                </select>

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
