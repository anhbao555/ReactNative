// screens/HomeScreen.js
import React, { useState, useEffect, useReducer } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import useFetch from './useFetch'

const API_URL = 'https://run.mocky.io/v3/8537bb1a-ced4-42db-8661-bb1ffe25f303';

const JobItem = ({ job, onEdit, isEditing, onSave, onDelete }) => {
  const [jobText, setJobText] = useState(job.title);

  return (
    <View style={styles.jobContainer}>
      <Icon style = {styles.checkBox} name = "check" size = {20} color= "#14923E"/>
      {isEditing ? (
        <TextInput
          
          value={jobText}
          onChangeText={(text) => setJobText(text)}
        />
      ) : (
        <Text style={styles.jobText}>{job.title}</Text>
      )
      }

      <TouchableOpacity
        onPress={isEditing 
        ? () => onSave(job.id, jobText) 
        : () => onEdit(job.id)
        }
      >
      <Text>{isEditing 
        ? 
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => onSave(job.id, jobText)}>
            <Icon name="save" size={20} color="red" style = {{marginRight : 10}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(job.id)}>
            <Icon name="trash" size={20} color="red" />
          </TouchableOpacity>
        </View> 
        : <Icon name="edit" size={20} color="red"/>}
      </Text>
      </TouchableOpacity>

    </View>
  );
};

const initialState = {
  jobs: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
    switch(action.type) {
      case "SET_JOBS":
        return { ...state, jobs: action.payload, loading: false };
      case "EDIT_JOB":
        return {...state, jobs: state.jobs.map((job) =>
          job.id === action.payload.id ? {...job, isEditing : true} : job
        ),
      };
      case "SAVE_JOB":
        return {...state, jobs: state.jobs.map((job) =>
          job.id === action.payload.id
            ? { ...job, title: action.payload.newText, isEditing: false }
            : job
        ),
      };
      case 'DELETE_JOB':
        return {
        ...state,
        jobs: state.jobs.filter((job) => job.id !== action.payload),
      };
      case 'SET_ERROR':
        return { ...state, error: action.payload, loading: false };
      case 'ADD_JOB':
        return { ...state, jobs: [...state.jobs, action.payload] };
      default:
        return state;
    }
}

const DetailsScreen = ({ navigation, route }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState('');
  const { jobs, loading, error } = state;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(API_URL);
        dispatch({ type: 'SET_JOBS', payload: response.data });
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err });
      }
    };
    fetchJobs();
  }, []);
  
  const renderItem = ({ item }) => (
    <JobItem
      job={item}
      isEditing={item.isEditing}
      onEdit={handleEdit}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );


  const handleEdit = (jobId) => {
    dispatch({ type: 'EDIT_JOB', payload: { id: jobId } });
  };

  const handleSave = (jobId, newText) => {
    dispatch({type: "SAVE_JOB", payload: {id : jobId, newText }});
  };

  const handleDelete = (id) => {
    dispatch({type: "DELETE_JOB", payload: id});
  };

  const filteredJobs = jobs.filter(jobs =>
    //jobs.title === 'string' &&
    jobs.title.toLowerCase().includes(search.toLowerCase())
  );

  const {newJob}= route.params

  useEffect(() => {
    if (newJob) {
      // Add the new job to the list
      const newJobAcc = { id: Math.random().toString(), title: newJob, isEditing : false };
      dispatch({type : "ADD_JOB", payload : newJob})
    }
  }, [newJob]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data: {error.message}</Text>;

  return (
    
    <View style={styles.container}>
    {/* Header */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {/* Display Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem = {renderItem}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddJob')}>
        <Icon name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignContent : "center"
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    padding: 10,
  },

  jobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#DEE1E678',
    borderRadius: 10,
    marginVertical: 5,
  },

  jobText: {
    fontSize: 18,
  },

  checkBox : {
    borderWidth : 2,
    borderColor : "#14923E"
  },  

  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 125,
    backgroundColor: '#0b84ff',
    borderRadius: 50,
    padding: 20,
  },
});

export default DetailsScreen;
