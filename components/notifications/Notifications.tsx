'use client'

import { Notification, NotificationType, useNotifications } from '@/store/notifications/notifications';
import { Box, CloseButton, Flex, Stack, Text } from '@chakra-ui/react';

export const Notifications = () => {
  const { notifications, dismissNotification } =
    useNotifications();

  if (notifications.length < 1) return null;

  return (  
    <Box
      as="section"
      p="4"
      position="fixed"
      className="bottom-[80px] md:bottom-[50px]"
      right="0"
      zIndex="1"
    >
      <Flex gap="4" direction="column-reverse"> 
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={dismissNotification}
          />
        ))}
      </Flex>
    </Box>
  );
};

const notificationVariants: Record<
  NotificationType,
  { bg: string }
> = {
  info: {
    bg: 'primary',
  },
  success: {
    bg: 'green',
  },
  warning: {
    bg: 'orange',
  },
  error: {
    bg: 'red',
  },
};

type NotificationToastProps = {
  notification: Omit<Notification, 'duration'>;
  onDismiss: (id: string) => void;
};

const NotificationToast = ({
  notification,
  onDismiss,
}: NotificationToastProps) => {
  const { id, type, title, message } = notification;

  return (
    <Box
      w="300px"
      boxShadow="md"
      color="white"
      {...notificationVariants[type]}
      className="rounded-lg"
    >
      <Stack
        direction="row"
        p="4"
        spacing="3"
        justifyContent="space-between"
      >
        <Stack spacing="2.5">
          <Stack spacing="1">
            <Text className="text-md font-semibold">
              {title} !
            </Text>
            {notification.message && (
              <Text fontSize="sm" color="muted">
                {message}
              </Text>
            )}
          </Stack>
        </Stack>
        <CloseButton
          onClick={() => onDismiss(id)}
          transform="translateY(-6px)"
        />
      </Stack>
    </Box>
  );
};