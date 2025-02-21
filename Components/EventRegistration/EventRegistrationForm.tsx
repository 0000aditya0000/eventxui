import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';

const EventRegistrationForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [competency, setCompetency] = useState('');
  const [phone, setPhone] = useState('');
  const [nightStay, setNightStay] = useState<string | undefined>();
  const [isOutstation, setIsOutstation] = useState<string | undefined>();

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Yes',
        value: 'Yes',
        size: 22,
      },
      {
        id: '2',
        label: 'No',
        value: 'No',
        size: 22,
      },
    ],
    []
  );

  const handleSubmit = () => {
    if (
      !name ||
      !employeeId ||
      !phone ||
      !competency ||
      !isOutstation ||
      !nightStay
    ) {
      Alert.alert('Please fill in all fields');
      return;
    }

    // Handle form submission (e.g., send data to server)
    Alert.alert('Hooray!! You successfully registered');
    setName('');
    setEmployeeId('');
    setPhone('');
    setCompetency('');
    setIsOutstation('');
    setNightStay('');
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.sectionHeadingContainer}>
        <Ionicons
          name='reader-outline'
          size={25}
          color='#45474D'
          style={{ paddingVertical: 4 }}
        />
        <Text style={styles.sectionHeading}>Register for Event</Text>
      </View>

      <View>
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter name'
          value={name}
          onChangeText={setName}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Employee Id</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter employee Id'
          value={employeeId}
          onChangeText={setEmployeeId}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Competency Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter competency name'
          value={competency}
          onChangeText={setCompetency}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Phone No.</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter phone'
          value={phone}
          onChangeText={setPhone}
        />
      </View>
      <View>
        <Text style={styles.labelText}>Are you an Outstation Nasher ?</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setIsOutstation}
          selectedId={isOutstation}
          layout='row'
        />
      </View>
      <View>
        <Text style={styles.labelText}>Do you require Night stay ?</Text>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setNightStay}
          selectedId={nightStay}
          layout='row'
        />
      </View>
      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  sectionHeadingContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#f0f1f2',
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 5,
  },
  input: {
    borderRadius: 15,
    backgroundColor: 'rgb(245 245 244)',
    padding: 10,
    width: '100%',
  },
  labelText: {
    marginBottom: 10,
    marginTop: 15,
    fontWeight: '600',
    fontSize: 16,
  },
  btnBox: {
    width: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  btnContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 15,
    backgroundColor: '#d6001c',
  },
  btnText: {
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default EventRegistrationForm;
