import zmq
from zmq.eventloop import ioloop
from zmq.eventloop.zmqstream import ZMQStream


ctx = zmq.Context.instance()
s = ctx.socket(zmq.PULL)
url = 'tcp://192.168.110:5555'
s.bind(url)


def print_msg(msg):
    print msg[0]
    if msg[0] == 'quit':
        ioloop.IOLoop.instance().stop()

# register the print_msg callback to be fired
# whenever there is a message on our socket
stream = ZMQStream(s)
stream.on_recv(print_msg)


# start the eventloop
ioloop.IOLoop.instance().start()
