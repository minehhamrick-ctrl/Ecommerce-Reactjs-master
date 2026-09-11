import React from 'react';
import styles from '../stylesheets/menu.module.sass';
import DropList from './DropList';
import jumpTo from '../../../modules/Navigation';

export default function Menu({
  departments,
  getProductsByCategory,
  getAllProducts
}) {
  const handleAllProductsClick = () => {
    getAllProducts();
    jumpTo('/dashboard');
  };

  return (
    <div className={styles.outbox}>
      {/* Department lists */}
      <div className={styles.lists}>
        {departments &&
          departments.map((department) => {
            const { departmentName, categories } = department;

            return (
              <div
                key={departmentName}
                className={styles.tag}
              >
                <DropList
                  clickCategory={(category) =>
                    getProductsByCategory(category)
                  }
                  department={departmentName}
                  categories={categories.split(',')}
                />
              </div>
            );
          })}
      </div>

      {/* All products */}
      <div
        className={styles.tag}
        onClick={handleAllProductsClick}
      >
        All Product
      </div>
    </div>
  );
}