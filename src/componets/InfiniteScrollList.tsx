import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { ListStore } from '../stores/ListStore';
import { ListItem } from './ListItem';
import styles from '../styles/App.module.css';

const listStore = new ListStore();

const InfiniteScrollList = observer(() => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listStore.fetchItems();

    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          listStore.fetchItems();
        }
      }
    };

    scrollRef.current?.addEventListener('scroll', handleScroll);
    return () => scrollRef.current?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={scrollRef} className={styles.scrollContainer}>
      {listStore.items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  );
});

export default InfiniteScrollList;
