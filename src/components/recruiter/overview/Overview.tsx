

import React,  {  useRef } from "react";
import { Chip,Grid,IconButton,InputLabel,} from "@mui/material";
import { Link} from 'react-router-dom'
// import "react-quill/dist/quill.snow.css";
import styles from "./Overview.module.css";


import TextAlign from '@tiptap/extension-text-align';
import  { StarterKit  } from "@tiptap/starter-kit";
import {
  MenuButtonBold,
  MenuButtonItalic,
 
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  type RichTextEditorRef,
} from "mui-tiptap";
import { FormatAlignLeft, FormatAlignCenter, FormatAlignRight,FormatIndentIncrease, FormatIndentDecrease    } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// const ReactQuill = React.lazy(() => import("react-quill"));



// const modules = {
//     toolbar: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic"],
//         [{ align: "" }, { align: "center" }, { align: "right" }],
//         [{ indent: '-1' },
//         { indent: '+1' }],

//     ],
// };

// const formats = [
//     "header",
//     "bold",
//     "italic",

//     "align",
//     'indent'

// ];

const OverviewPage = () => {


    
    const [jobDescription, setJobDescription] = React.useState("");
    const [inputValue, setInputValue] = React.useState('');
    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        numPositions: '',
        locations: [] as string[],
        closingDate: '',
    });
   

    const handleRemoveLocation = (location: string) => {
        setFormData((prevData) => ({
            ...prevData,
            locations: prevData.locations.filter((loc) => loc !== location),
        }));
    };
    const handleAddLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();

            const trimmedValue = inputValue.trim();
            if (trimmedValue && !formData.locations.includes(trimmedValue)) {
                setFormData((prevData) => ({
                    ...prevData,
                    locations: [...prevData.locations, trimmedValue],
                }));
            }
            setInputValue('');
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


      const handleTextAlign = (align: string) => {
        if (rteRef.current && rteRef.current.editor) {
          const { editor } = rteRef.current;
          editor.chain().focus().setTextAlign(align).run();
        }
      };
      const handleIncreaseIndent = () => {
        if (rteRef.current && rteRef.current.editor) {
          const { editor } = rteRef.current;
          editor.chain().focus().toggleBlockquote().run(); 
        }
      };

      const handleDecreaseIndent = () => {
        if (rteRef.current && rteRef.current.editor) {
          const { editor } = rteRef.current;
          editor.chain().focus().toggleBlockquote().run(); 
        }
      };

      const handleUndo = () => {
        if (rteRef.current && rteRef.current.editor) {
          const editor = rteRef.current.editor;
          editor.chain().focus().undo().run();
        }
      };
    
      const handleRedo = () => {
        if (rteRef.current && rteRef.current.editor) {
            const editor = rteRef.current.editor;
            editor.chain().focus().redo().run();
        }
      };
   
      const rteRef = useRef<RichTextEditorRef>(null);


    return (
        <>
            <div>
         
                <div className={styles.containerWrapper}>
            

                    <div className={styles.container}>
                        <div className={styles.headings}>Please specify the skills you are seeking in candidates. </div>
                        <div className={styles.subheadings}>Please note, that all resumes submitted for this position will be evaluated based on these criteria.</div>

                        <Grid container spacing={3}>

                            <Grid item xs={12} sm={6}>
                                <InputLabel sx={{ marginTop: "20px" }}>Job Title</InputLabel>
                                <input type="text" placeholder="Enter" className={styles.customInput} />
                                <InputLabel sx={{ marginTop: "20px" }}>Job Description</InputLabel>
                                <div className={styles.textEditorui}>
                                    <ul className={styles.ulStyle1}>
                                        <li className={styles.ulLiStyle1}>File</li>
                                        <li className={styles.ulLiStyle1}>Edit</li>
                                        <li className={styles.ulLiStyle1}>View</li>
                                        <li className={styles.ulLiStyle1}>Format</li>
                                        <li className={styles.ulLiStyle1}>Tools</li>
                                    </ul>
                                   
                                    <RichTextEditor
                                    
        ref={rteRef}
        extensions={[StarterKit,
            TextAlign.configure({ types: ['heading', 'paragraph'] }), 
        ]} 
        className={styles.customRichTextEditorContainer} 
        content={jobDescription}
        onUpdate={({ editor }) => {
            
            setJobDescription(editor.getHTML());
          }}
        renderControls={() => (
          <MenuControlsContainer>
              <IconButton onClick={handleUndo} size="small" className={styles.customIconButton}>
                  <ArrowBackIcon />
                </IconButton>
                <IconButton onClick={handleRedo} size="small" className={styles.customIconButton}>
                  <ArrowForwardIcon />
                </IconButton>
            <MenuSelectHeading />
            <MenuDivider />
            <MenuButtonBold />
            <MenuButtonItalic />
            <MenuDivider />
            <IconButton onClick={() => handleTextAlign('left')} className={styles.customIconButton}>
                      <FormatAlignLeft />
                    </IconButton>
                    <IconButton onClick={() => handleTextAlign('center')} className={styles.customIconButton}>
                      <FormatAlignCenter />
                    </IconButton>
                    <IconButton onClick={() => handleTextAlign('right')} className={styles.customIconButton}>
                      <FormatAlignRight />
                    </IconButton>
                    <MenuDivider />
                    <IconButton onClick={handleIncreaseIndent} className={styles.customIconButton}>
                      <FormatIndentIncrease />
                    </IconButton>
                    <IconButton onClick={handleDecreaseIndent} className={styles.customIconButton}>
                      <FormatIndentDecrease />
                    </IconButton>
          </MenuControlsContainer>
        )}
      />
                   {/* <ReactQuill
                                        theme="snow"
                                        value={jobDescription}
                                        onChange={handleDescriptionChange}
                                        modules={modules}
                                        formats={formats}

                                        style={{ height: "150px", marginBottom: "20px", border: " #FFE2C8", }}
                                    /> */}
                                           
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={6}>
                                <InputLabel sx={{ marginTop: "20px" }}>No of Positions</InputLabel>
                                <input type="text" placeholder="Enter" className={styles.customInput} />
                                <InputLabel sx={{ marginTop: "20px" }}>Locations</InputLabel>
                                <div className={styles.location}>
                                    <div className={styles.tagsContainer}>
                                        {formData.locations.map((location, index) => (
                                            <Chip
                                                key={index}
                                                label={location}
                                                onDelete={() => handleRemoveLocation(location)}
                                                className={styles.tag}
                                            />
                                        ))}
                                    </div>
                                    <input type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleAddLocation}
                                        placeholder="Location"
                                        style={{ border: 'none', outline: 'none' }}

                                    />


                                </div>

                                <InputLabel sx={{ marginTop: "20px" }}>Position Open Till</InputLabel>
                                <input
                                type="text"
                                name="closingDate"
                                value={formData.closingDate}
                                onChange={handleInputChange}
                                onFocus={(e) => {
                                e.target.type = 'date';
                                e.target.min = new Date().toISOString().split('T')[0]; 
                             }}
                                onBlur={(e) => {
                                if (!e.target.value) e.target.type = 'text'; 
                             }}
                                 placeholder="Select a date"
                                 className={styles.customInput}
                                 />
                              

                            </Grid>


                        </Grid>
                    </div>
                    <div style={{ marginTop: '25px' }}>



                        <Grid item xs={12} md={6} className={styles.alignRight}>
                           
                             <Link to="/recruiter/job/new-job/screening" className={styles.screen2} style={{ marginLeft: '15px' }} >Next</Link> 
                        </Grid>
                     
                    </div>
                </div>
          
            </div>
        </>
    );
};

export default OverviewPage;
