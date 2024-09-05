import { useState, useEffect } from 'react';
import styles from './param.module.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { testDetailsState } from '@src/utils/recoil/reports';

export const ViewComponent = ({ component }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [components, setComponents] = useState(component);
  const [currentComponent, setCurrentComponent] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [testDetails, setTestDetail] = useRecoilState(testDetailsState);

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
    //@ts-ignore
    setTestDetail({ ...testDetails, components: components });
  }, [components]);

  const handleMouseEnter = (component) => {
    setHoveredComponent(component);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <section>
      <section className={`${styles.componentsList} my-6`}>
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
                {/* <div className={styles.componentActions}>
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
                </div> */}
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
    </section>
  );
};
