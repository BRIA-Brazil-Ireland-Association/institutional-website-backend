import * as React from 'react';
import { useFetchClient, useNotification, Layouts } from '@strapi/strapi/admin';
import { Box, Button, Flex, Typography } from '@strapi/design-system';
import { ArrowClockwise } from '@strapi/icons';

const RevalidateFrontendCachePage = () => {
  const { get } = useFetchClient();
  const { toggleNotification } = useNotification();
  const [loading, setLoading] = React.useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      await get('/api/revalidate-frontend-cache');

      toggleNotification({
        type: 'success',
        message: 'Cache do frontend atualizado com sucesso!',
      });
    } catch (error) {
      toggleNotification({
        type: 'danger',
        message: 'Falha ao atualizar o cache do frontend.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layouts.Root>
      <Layouts.Header
        title="Cache do frontend"
        subtitle="Força o frontend a buscar o conteúdo mais recente publicado no CMS."
      />
      <Layouts.Content>
        <Box background="neutral0" padding={6} shadow="tableShadow" hasRadius>
          <Flex direction="column" alignItems="flexStart" gap={4}>
            <Typography variant="omega">
              Clique no botão abaixo para disparar a revalidação do cache do frontend.
            </Typography>
            <Button startIcon={<ArrowClockwise />} onClick={handleClick} loading={loading}>
              Atualizar cache do frontend
            </Button>
          </Flex>
        </Box>
      </Layouts.Content>
    </Layouts.Root>
  );
};

export default RevalidateFrontendCachePage;
