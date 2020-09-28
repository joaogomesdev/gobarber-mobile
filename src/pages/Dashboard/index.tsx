import React, { useState, useCallback, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container ,
  Header ,
  HeaderTitle ,
  UserName ,
  ProfileButton ,
  UserAvatar ,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle

} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut , user } = useAuth();
  const { navigate } = useNavigation();

  const [providers, setProviders] = useState<Provider[]>([]);

  const navigateToProfile = useCallback(() => {
      navigate('Profile');
      // signOut();
    },
    [navigate]
  );

  const navigateToCreateAppointment = useCallback((providerId: string) => {
      navigate('CreateAppointment', {
        providerId
      });
  },[navigate]);


  useEffect(() => {
    api.get('/providers').then(response => {
        setProviders(response.data);
    })

  }, [])

  return (
    <Container >
      <Header>

        <HeaderTitle>
          Bem-vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile} >
            <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>

      </Header>

      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Barbeiros</ProvidersListTitle>
        }
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
              <ProviderAvatar source={{ uri: provider.avatar_url }} />

              <ProviderInfo>
                <ProviderName>{provider.name}</ProviderName>

                <ProviderMeta>
                  <Icon name="calendar" size={14} color="#ff9000" />
                    <ProviderMetaText>Segunda ã Sexta</ProviderMetaText>
                </ProviderMeta>

                <ProviderMeta>
                  <Icon name="clock" size={14} color="#ff9000" />
                    <ProviderMetaText>Das 8h às 18h</ProviderMetaText>
                </ProviderMeta>

              </ProviderInfo>
          </ProviderContainer>
        )}
      />

    </Container>
  );
};

export default Dashboard;
