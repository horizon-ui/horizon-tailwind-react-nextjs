import { Button } from 'antd';
import { useState, useEffect } from 'react';
import AddParameters from './create';
import styles from './param.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import ComponentForm from '../components';
import { testDetailsState } from '@src/utils/recoil/reports';
import { ViewParameters } from './view';

export const ParameterComp = ({ handleNext, handlePrevious, edit }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [components, setComponents] = useState([]);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [testDetails, setTestDetail] = useRecoilState(testDetailsState);

  useEffect(() => {
    if (edit) {
      setComponents(testDetails?.components);
    }
  }, [edit]);

  useEffect(() => {
    let timer;
    if (!isHovering) {
      timer = setTimeout(() => {
        setHoveredComponent(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isHovering]);

  useEffect(() => {
    setTestDetail({ ...testDetails, components: components });
  }, [components]);

  const handleCreateOrEdit = (values) => {
    if (isEditing && editIndex !== null) {
      const updatedComponents = [...components];
      updatedComponents[editIndex] = {
        ...updatedComponents[editIndex],
        ...values,
      };
      setComponents(updatedComponents);

      setIsEditing(false);
      setEditIndex(null);
    } else {
      setComponents((prevComponents) => [
        ...prevComponents,
        {
          title: values.title,
          content: values.content,
          isDynamic: values.isDynamic,
          images: values.images || [],
        },
      ]);
    }
    setIsModalVisible(false);
  };

  const handleEdit = (index) => {
    const component = components[index];
    setCurrentComponent(component);
    setEditIndex(index);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  const handleMouseEnter = (component) => {
    setHoveredComponent(component);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section>
      <ViewParameters />
      <section className={`${styles.componentsList} mt-6`}>
        <h2 className="mb-4 text-lg font-bold">Created Components</h2>
        <section className={`${styles.componentGrid} mt-6`}>
          {components?.length === 0 ? (
            <p>No components created yet.</p>
          ) : (
            components.map((component, index) => (
              <div key={index} className={styles.componentCard}>
                <div
                  className={styles.componentTitle}
                  onMouseEnter={() => handleMouseEnter(component)}
                  onMouseLeave={handleMouseLeave}
                >
                  {component.title}
                  {component.isDynamic ? (
                    <span className={styles.staticLabel}>Dynamic</span>
                  ) : (
                    <span className={styles.dynamicLabel}>Static</span>
                  )}
                </div>
                <div className={styles.componentActions}>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleEdit(index)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.iconButton}
                    onClick={() => handleDelete(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
        {/* Modal-like box at the bottom */}
        {hoveredComponent && (
          <div
            className={`${styles.hoverBox} ${
              isHovering ? styles.show : styles.hide
            }`}
          >
            <h3>{hoveredComponent.title}</h3>
            <div
              dangerouslySetInnerHTML={{ __html: hoveredComponent.content }}
            ></div>
            {hoveredComponent.isDynamic &&
              hoveredComponent.images.length > 0 && (
                <div className={`${styles.images} mt-4`}>
                  <h4 className="text-sm font-semibold">Images:</h4>
                  <div className="mt-2 flex gap-2">
                    {hoveredComponent.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`/path/to/uploads/${img}`}
                        alt={`Component Image ${idx}`}
                        className="h-16 w-16 object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        )}
      </section>
      <section className="mt-6 flex justify-between">
        <section className="flex">
          <Button className="mt-4" onClick={handleNext} type="primary">
            Next
          </Button>
          <Button className="mx-4 mt-4" onClick={handlePrevious} type="default">
            Previous
          </Button>
        </section>
        <section className="flex gap-2">
          <AddParameters edit={false} />
          <div>
            <Button type="default" onClick={() => setIsModalVisible(true)}>
              Create New Component
            </Button>
            <ComponentForm
              visible={isModalVisible}
              onCreate={handleCreateOrEdit}
              onCancel={() => {
                setIsModalVisible(false);
                setIsEditing(false);
                setEditIndex(null);
                setCurrentComponent(null);
              }}
              initialValues={currentComponent || {}}
            />
          </div>
        </section>
      </section>
    </section>
  );
};
